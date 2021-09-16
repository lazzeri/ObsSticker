//THESE ARE THE 5 THINGS YOU HAVE TO SET YOURSELF:
// PLEASE BE CAREFUL - ONLY MODIFY THE NUMBERS AND THE USER NAME
var userName = "FelipeBrutal";

//For the maximum amount of emojis per text
let maxEmojiCount = 30;

// 0 Means no profile pics, 1 Means Low, 2 Means Medium, 3 Means High
let profilePictureAmountLevel = 2;

//Sticker Amount for each Gift, to turn of set to 0.
let heartGift = 5;

let applaudGift = 12;
let notesGift = 15;
let likeGift50 = 5;
let likeGift400 = 6;
let likeGift2000 = 8;
let likeGift5000 = 15;
let likeGift10000 = 20;


//Sticker Passen
let tipJar200 = 15;
let tipJar500 = 25;
let tipJar1000 = 30;
let tipJar2500 = 40;
let tipJar10000 = 50;
let tipJar15000 = 60;
let tipJar25000 = 70;
let tipJar30000 = 80;
let tipJar100000 = 100;


//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

//Nono zone for non coders!

//We need Lists for:
let width = 1200;
let height = 500;
let down = 150;
let toTheRight = 100;
var broadcastId;

let notes = ['Note0', 'Note1', 'Note2', 'Note3', 'Note4', 'Note5'];
let tipJars = ['LightBlue', 'Blue', 'Green', 'LightGreen', 'Pink', 'Purple', 'Silver', 'Red', 'Yellow', 'Gold'];

var userId;
var error = false;
var eventsToTrigger = [];
let minX = toTheRight;
let maxX = toTheRight + width;
let minY = down;
let maxY = down + height;
let goodies;

//CONSTRUCTS FOR ANIMATIONS
async function RunCode()
{
    DownloadGifts ();
    FetchBroadcastId ();
    CastEvents ();
}

async function DownloadGifts()
{
    console.log ("Fetching Gifts...");
    targetUrl = 'https://ynassets.younow.com/giftsData/live/de/data.json';
    var json = fetch (targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
            json = JSON.stringify (data, null, 2);
            goodies = JSON.parse (json);
        });
}

async function CastEvents()
{
    while (true)
    {
        if (eventsToTrigger.length != 0)
        {
            var totrigger = eventsToTrigger.shift ();
            console.log (totrigger);
            Animation (totrigger, false, 0);
        }
        await sleep (200);
    }
}

async function Retry()
{
    console.log ("Retrying in 5 seconds");
    await sleep (5000);
    error = false;
    FetchBroadcastId ();
}

async function FetchBroadcastId()
{
    console.log ("Fetching Broadcast....");
    var proxyUrl = 'https://younow-cors-header.herokuapp.com/?q=',
        targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + userName;
    var json = fetch (proxyUrl + targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
            json = JSON.stringify (data, null, 2);
            var done = JSON.parse (json);
            if (json.length < 1)
            {
                console.log ("No Data Found");
                error = true;
            } else if (done.errorCode !== 0)
            {
                console.log ("User not online or not found");
                error = true;
            }
            if (error)
            {
                console.log ("Error Found Retrying")
                Retry ();
                return;
            } else
            {
                userId = done.userId;
                broadcastId = done.broadcastId;
                console.log ("Data Found");
                FetchEvent ();
                return;
            }
        })
        .catch (e =>
        {
        });
}

function FetchEvent()
{
    //First Startup Connection:
    console.log ("Succesfully Connected to WebSocket");
    var pusher = new Pusher ('d5b7447226fc2cd78dbb', {
        cluster: "younow"
    });
    var channel = pusher.subscribe ("public-channel_" + userId);

    //Get Stickers
    channel.bind ('onPartnerSticker', function (data)
    {
        if (data.message !== "undefined")
        {
            for (let i = 0; i < data.message.stageGifts.length; i++)
            {
                Animation (data.message.stageGifts[i].target, false, 0);
            }
        }
    });

    channel.bind ('onChat', function (data)
    {

        if (data.message !== "undefined")
        {
            for (let i = 0; i < data.message.comments.length; i++)
            {
                let input = data.message.comments[i].comment;
                castEmoji (input);
            }

        }
    });

    //Get Gifts
    channel.bind ('onGift', function (data)
    {
        if (data.message !== "undefined")
        {
            for (let i = 0; i < data.message.stageGifts.length; i++)
            {
                let userId = data.message.stageGifts[i].userId;
                console.log (data.message.stageGifts[i].giftId);
                switch (data.message.stageGifts[i].giftId)
                {
                    case(5):
                        Animation ("Likes", false, 0);
                        break;
                    case(187):
                        Animation ("Avocado", false, 0);
                        break;
                    case(472):
                        Animation ("Bo", false, 0);
                        break;
                    case(136):
                        Animation ("Burger", false, 0);
                        break;
                    case(201):
                        Animation ("Cactus", false, 0);
                        break;
                    case(191):
                        Animation ("Cone", false, 0);
                        break;
                    case(189):
                        Animation ("Cupcake", false, 0);
                        break;
                    case(192):
                        Animation ("Dancer", false, 0);
                        break;
                    case(204):
                        Animation ("Donut", false, 0);
                        break;
                    case(195):
                        Animation ("Flame", false, 0);
                        break;
                    case(198):
                        Animation ("Guitar", false, 0);
                        break;
                    case(854):
                        Animation ("Heart", false, 0);
                        break;
                    case(206):
                        Animation ("Lips", false, 0);
                        break;
                    case(197):
                        Animation ("Microphone", false, 0);
                        break;
                    case(194):
                        Animation ("Peacesign", false, 0);
                        break;
                    case(202):
                        Animation ("Pizza", false, 0);
                        break;
                    case(306):
                        Animation ("Props1", false, 0);
                        break;
                    case(305):
                        Animation ("Props2", false, 0);
                        break;
                    case(196):
                        Animation ("Puppy", false, 0);
                        break;
                    case(205):
                        Animation ("Ring", false, 0);
                        break;
                    case(207):
                        Animation ("Rose", false, 0);
                        break;
                    case(193):
                        Animation ("Unicorn", false, 0);
                        break;
                    case(200):
                        Animation ("Dino", false, 0);
                        break;
                    case(858):
                        Animation("Pray",false,0);
                        break;
                    case(860):
                        Animation("Scream",false,0);
                        break;
                    case(857):
                        Animation("Love",false,0);
                        break;
                    case(861):
                        Animation("Smile",false,0);
                        break;
                    case(856):
                        Animation("Cry",false,0);
                        break;
                    case(859):
                        Animation("Sad",false,0);
                        break;
                    case(855):
                        Animation("Hi",false,0);
                        break;
                    case(853):
                        Animation("DragMe",false,0);
                        break;
                    case(852):
                        Animation("Coktail",false,0);
                        break;
                    case(851):
                        Animation("Beer",false,0);
                        break;
                    case(875):
                        Animation("Speaker",false,0);
                        break;
                    case(866):
                        Animation("OMG",false,0);
                        break;
                    //Gift Cases
                    case(384):
                        loopGifts (notesGift, 384, true, 0, userId);
                        break;
                    case(312):
                        //Applaus
                        loopGifts (applaudGift, 312, true, 0, userId);
                        break;
                    case(356):
                        //Heart Gif
                        loopGifts (heartGift, 356, true, 0, userId);
                        break;
                    case(355):
                        //50 Likes
                        loopGifts (likeGift50, 355, true, 0, userId);
                        break;
                    case(354):
                        //400 Likes
                        loopGifts (likeGift400, 354, true, 0, userId);
                        break;
                    case(113):
                        //2k Likes
                        loopGifts (likeGift2000, 113, true, 0, userId);
                        //etc etc
                        break;
                    case(616):
                        //5k Likes
                        loopGifts (likeGift5000, 616, true, 0, userId);
                    case(619):
                        //10K Likes
                        loopGifts (likeGift10000, 619, true, 0, userId);
                        break;
                    case(42):
                        let tipJarValue = data.message.stageGifts[i].extraData.numOfLikes;
                        //Tip jars:
                        switch (tipJarValue)
                        {
                            case(200):
                                loopGifts (tipJar200, 619, true, tipJarValue, userId);
                                break;
                            case(1000):
                                loopGifts (tipJar1000, 619, true, tipJarValue, userId);
                                break;
                            case(2500):
                                loopGifts (tipJar2500, 619, true, tipJarValue, userId);
                                break;
                            case(15000):
                                loopGifts (tipJar15000, 619, true, tipJarValue, userId);
                                break;
                            case(30000):
                                loopGifts (tipJar30000, 619, true, tipJarValue, userId);
                                break;
                            case(100000):
                                loopGifts (tipJar100000, 619, true, tipJarValue, userId);
                                break;
                        }
                        break;
                }
            }

        }
    });
}

async function Animation(StickerName, isGift, tipJarValue)
{
    var WholeThing = document.createElement ("div");
    WholeThing.id = "WholeThing";

    //Create Picture PASS
    var Picture = document.createElement ("div");
    Picture.id = "CustomPicture";
    Picture.style.position = "absolute";
    let randos;
    //SET HEIGHT
    if (isGift)
    {
        randos = RandomCords (200);
        Picture.classList.add ("BigSticker");
        Picture.style.height = 100 + "px";
        Picture.style.width = 100 + "px";
    } else if (Number.isInteger (StickerName) || StickerName.localeCompare ("Likes") === 0)
    {
        randos = RandomCords (200);
        Picture.classList.add ("BigSticker");
        Picture.style.height = 300 + "px";
        Picture.style.width = 300 + "px";
    } else
    {
        randos = RandomCords (150);
        Picture.classList.add ("SmallSticker");
        Picture.style.height = 156 + "px";
        Picture.style.width = 156 + "px";
    }



    if (!isGift)
    {
        //Set picture size
        switch (StickerName)
        {
            case "Pray":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/pray.png')";
                break;
            case "Scream":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/scream.png')";
                break;
            case "Love":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/love.png')";
                break;
            case "Smile":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/smile.png')";
                break;
            case "Cry":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/cry.png')";
                break;
            case "Sad":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/sad.png')";
                break;
            case "Hi":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/hi.png')";
                break;
            case "DragMe":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/dragme.png')";
                break;
            case "Coktail":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/coktail.png')";
                break;
            case "Beer":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/beer.png')";
                break;
            case "Speaker":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/speaker.png')";
                break;
            case "OMG":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/omg.png')";
                break;
            case "Likes":
                Picture.style.backgroundImage = "url('Stickers/10.png')";
                break;
            case "Avocado":
                Picture.style.backgroundImage = "url('Stickers/avocado.png')";
                break;
            case "Bo":
                Picture.style.backgroundImage = "url('Stickers/bo.png')";
                break;
            case "Burger":
                Picture.style.backgroundImage = "url('Stickers/burger.png')";
                break;
            case "Cactus":
                Picture.style.backgroundImage = "url('Stickers/cactus.png')";
                break;
            case "Cone":
                Picture.style.backgroundImage = "url('Stickers/cone.png')";
                break;
            case "Cupcake":
                Picture.style.backgroundImage = "url('Stickers/cupcake.png')";
                break;
            case "Dancer":
                Picture.style.backgroundImage = "url('Stickers/dance.png')";
                break;
            case "Donut":
                Picture.style.backgroundImage = "url('Stickers/donut.png')";
                break;
            case "Flame":
                Picture.style.backgroundImage = "url('Stickers/flame.png')";
                break;
            case "Guitar":
                Picture.style.backgroundImage = "url('Stickers/guitar.png')";
                break;
            case "Heart":
                Picture.style.height = 100  + "px";
                Picture.style.width = 100 + "px";
                Picture.style.backgroundImage = "url('Stickers/heart.png')";
                break;
            case "Lips":
                Picture.style.backgroundImage = "url('Stickers/lips.png')";
                break;
            case "Microphone":
                Picture.style.backgroundImage = "url('Stickers/microphone.png')";
                break;
            case "Peacesign":
                Picture.style.backgroundImage = "url('Stickers/peacesign.png')";
                break;
            case "Pizza":
                Picture.style.backgroundImage = "url('Stickers/pizza.png')";
                break;
            case "Props1":
                Picture.style.backgroundImage = "url('Stickers/props1.png')";
                break;
            case "Props2":
                Picture.style.backgroundImage = "url('Stickers/props2.png')";
                break;
            case "Puppy":
                Picture.style.backgroundImage = "url('Stickers/puppy.png')";
                break;
            case "Ring":
                Picture.style.backgroundImage = "url('Stickers/ring.png')";
                break;
            case "Rose":
                Picture.style.backgroundImage = "url('Stickers/rose.png')";
                break;
            case "Unicorn":
                Picture.style.backgroundImage = "url('Stickers/unicorn.png')";
                break;
            case "Dino":
                Picture.style.backgroundImage = "url('Stickers/dino.png')";
                break;
            default:
                Picture.style.backgroundImage = "url('https://ynassets.younow.com/gifts/live/PARTNER_STICKER/" + StickerName + "/ios_icon_gift_PARTNER_STICKER_bar@3x.png')";
        }
    } else
    {
        if (tipJarValue !== 0)
        {
            let item;
            console.log (tipJarValue);
            switch (tipJarValue)
            {
                case(200):
                    item = tipJars[Math.floor (randomNumber (0, 3))];
                    break;
                case(500):
                    item = tipJars[Math.floor (randomNumber (2, 5))];
                    break;
                case(1000):
                    item = tipJars[Math.floor (randomNumber (3, 6))];
                    break;
                case(2500):
                    item = tipJars[Math.floor (randomNumber (4, 7))];
                    break;
                case(10000):
                    item = tipJars[Math.floor (randomNumber (5, 8))];
                    break;
                case(15000):
                    item = tipJars[Math.floor (randomNumber (5, 8))];
                    break;
                case(25000):
                    item = tipJars[Math.floor (randomNumber (6, 9))];
                    break;
                case(30000):
                    item = tipJars[Math.floor (randomNumber (7, 10))];
                    break;
                case(100000):
                    item = tipJars[Math.floor (randomNumber (7, 10))];
                    break;
            }
            Picture.style.backgroundImage = "url('TipJars/TipJar" + item + ".png')";

        } else
        {
            switch (StickerName)
            {
                //IF we wanna add other unique gifts
                case(384):
                    //NOTES
                    let item = notes[Math.floor (Math.random () * notes.length)];
                    Picture.style.backgroundImage = "url('MiscGifts/" + item + ".png')";
                    break;
                default:
                    Picture.style.backgroundImage = "url('MiscGifts/" + StickerName + ".png')";
            }
        }
    }

//Random position:
    Picture.style.top = randos.y + "px";
    Picture.style.left = randos.x + "px";

//Appending Picture PASS
    WholeThing.appendChild (Picture);
    document.getElementById ("Container").appendChild (WholeThing);
    console.log (Picture.style.transform);

//Wait and Remove PASS
    await sleep (2000);
    var all = document.getElementById ("WholeThing");
    all.parentNode.removeChild (all);
}

async function AddProfilePic(times, profileId)
{
    for (i = 0; i < times; i++)
    {
        await sleep (randomNumber (0, 300));
        var WholeThing = document.createElement ("div");
        WholeThing.id = "WholeThing";
        //Create Picture PASS
        var Picture = document.createElement ("div");
        Picture.id = "CustomPicture";
        Picture.style.position = "absolute";
        let randos;
        //SET HEIGHT
        randos = RandomCords (200);
        Picture.classList.add ("ProfilePics");
        Picture.style.height = 100 + "px";
        Picture.style.width = 100 + "px";
        Picture.style.backgroundImage = "url(' https://ynassets.younow.com/user/live/" + profileId + "/" + profileId + ".jpg')";
        //Random position:
        Picture.style.top = randos.y + "px";
        Picture.style.left = randos.x + "px";

        //Appending Picture PASS
        WholeThing.appendChild (Picture);
        document.getElementById ("Container").appendChild (WholeThing);
        console.log (Picture.style.transform);

        //Wait and Remove PASS
        await sleep (2000);
        var all = document.getElementById ("WholeThing");
        all.parentNode.removeChild (all);
    }

}

async function Sticker(stickerText)
{
    await sleep (randomNumber (0, 600));
    let WholeThing = document.createElement ("div");
    WholeThing.id = "WholeThing";

    let randos = RandomCords (200);
    console.log (randos);
    let emoji = document.createElement ("div");
    emoji.classList.add ("Emoji");
    emoji.innerText = stickerText;
    emoji.style.position = "absolute";
    emoji.style.width = "50px";
    emoji.style.height = "50px";
    emoji.style.transform = "scale(2)";
    //Random position:
    emoji.style.top = randos.y + "px";
    emoji.style.left = randos.x + "px";

    //Appending Picture PASS
    WholeThing.appendChild (emoji);
    document.getElementById ("Container").appendChild (WholeThing);
    //Wait and Remove PASS
    await sleep (2000);
    let all = document.getElementById ("WholeThing");
    all.parentNode.removeChild (all);
}

function sleep(milliseconds)
{
    return new Promise (resolve => setTimeout (resolve, milliseconds));
}

async function loopGifts(iterations, name, isGift, tipJarValue, profileId)
{
    for (let i = 0; i < iterations; i++)
    {
        console.log ("Iteration nr: " + i);
        let randNum = randomNumber (0, 100);
        switch (profilePictureAmountLevel)
        {
            case(1):
                //40%
                if (randNum >= 60)
                    AddProfilePic (1, profileId);
                break;
            case(2):
                //70%
                if (randNum >= 30)
                    AddProfilePic (1, profileId);
                break;
            case(3):
                //100%
                AddProfilePic (1, profileId);
                break;
            default:
                break;
        }
        Animation (name, isGift, tipJarValue);
        await sleep (randomNumber (200, 450));
    }
}

function TestStickers()
{
    let arr = ["Likes", "Avocado", "Bo", "Burger", "Cactus", "Cone", "Cupcake", "Dancer", "Donut", "Flame", "Guitar", "Heart", "Lips", "Microphone", "Peacesign", "Pizza", "Props1", "Props2", "Puppy", "Ring", "Rose", "Unicorn"];
    let item = arr[Math.floor (Math.random () * arr.length)];
    eventsToTrigger.push ("DragMe");
}

function TestEmojis()
{
    let arr = ["Likes", "Avocado", "Bo", "Burger", "Cactus", "Cone", "Cupcake", "Dancer", "Donut", "Flame", "Guitar", "Heart", "Lips", "Microphone", "Peacesign", "Pizza", "Props1", "Props2", "Puppy", "Ring", "Rose", "Unicorn"];
    let item = arr[Math.floor (Math.random () * arr.length)];
    Sticker ("😊");
}

function TestProfilePics()
{
    AddProfilePic (randomNumber (2, 5), 7081785);
}

function TestSticker()
{
    let val = document.getElementById ('giftSelection').value;
    let userId = 7081785;
    switch (val)
    {
        case('Heart'):
            loopGifts (heartGift, 356, true, 0, userId);
            break;
        case('Applaud'):
            loopGifts (applaudGift, 312, true, 0, userId);
            break;
        case('Notes'):
            loopGifts (notesGift, 384, true, 0, userId);
            break;
        case('like50'):
            loopGifts (likeGift50, 355, true, 0, userId);
            break;
        case('like400'):
            loopGifts (likeGift400, 354, true, 0, userId);
            break;
        case('like2000'):
            loopGifts (likeGift2000, 113, true, 0, userId);
            break;
        case('like5000'):
            loopGifts (likeGift5000, 616, true, 0, userId);
            break;
        case('like10000'):
            loopGifts (likeGift10000, 619, true, 0, userId);
            break;
        case('TipJar200'):
            loopGifts (tipJar200, 619, true, 200, userId);
            break;
        case('TipJar500'):
            loopGifts (tipJar500, 619, true, 500, userId);
            break;
        case('TipJar1000'):
            loopGifts (tipJar1000, 619, true, 1000, userId);
            break;
        case('TipJar5000'):
            loopGifts (tipJar5000, 619, true, 5000, userId);
            break;
        case('TipJar10000'):
            loopGifts (tipJar10000, 619, true, 10000, userId);
            break;
        case('TipJar15000'):
            loopGifts (tipJar15000, 619, true, 25000, userId);
            break;
        case('TipJar2500'):
            loopGifts (tipJar2500, 619, true, 25000, userId);
            break;
        case('TipJar30000'):
            loopGifts (tipJar30000, 619, true, 30000, userId);
            break;
        case('TipJar100000'):
            loopGifts (tipJar100000, 619, true, 100000, userId);
            break;
    }

}

function ChangeSize()
{
    let elem = document.getElementById ("InputContainer");
    let xChord = document.getElementById ("xChord").value;
    let yChord = document.getElementById ("yChord").value;
    let top = document.getElementById ("Top");
    let right = document.getElementById ("Right");
    elem.style.width = xChord + "px";
    elem.style.height = yChord + "px";
    elem.style.marginTop = top.value + "px";
    elem.style.marginLeft = right.value + "px";
}

function RandomCords(size)
{
    let thisx = randomNumber (minX, maxX - size);
    let thisy = randomNumber (minY, maxY - size);
    //maxX - 150
    //minX passt
    //minY passt

    return {x: thisx, y: thisy};
}

function randomNumber(min, max)
{
    return Math.random () * (max - min) + min;
}

function castEmoji(input)
{
    const regex = allEmojis ();
    if (regex.test (input))
    {
        const emojis = input.match (regex);
        for (i = 0; i < emojis.length; i++)
        {
            if (i > maxEmojiCount)
                return;
            Sticker (emojis[i]);
        }
    }
}

function allEmojis()
{
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFE])|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])?|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]/g;
};
