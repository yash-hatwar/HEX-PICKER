const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid')
const colorValue = document.querySelector('.colorValue')
const text = document.querySelector('.text');

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    //varacha chrome ext madhi run hote ani execute script cha chrome web page vr return hote result
    //injecting script in chromeWebPage.
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor()
        }
        
    )
})



async function pickColor() {
    let selectedColor;
    try {
        //Picker
        const eyeDropper = new EyeDropper();
        selectedColor = await eyeDropper.open();
        console.log("Your color is :", selectedColor.sRGBHex);
    }
    catch (err) {
        console.error(err);
    }

    //printing results in the popup
     const result = selectedColor.sRGBHex;
    colorGrid.style.backgroundColor = result;
    colorValue.innerText = result;
    text.innerText="Yehh you got the color !!!"
    
}