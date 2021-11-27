let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let initialPixels = imageData.data;

let fileInput = document.getElementById('file-input');


fileInput.addEventListener('change', function(ev) {

    if(ev.target.files) {
        let file = ev.target.files[0];
        let reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            let image = new Image();
            image.src = e.target.result;
            image.onload = function() {

                let divCanvas = document.getElementsByClassName("canvas")[0];
                let canvasWidth =  divCanvas.offsetWidth;
                let canvasHeight = divCanvas.offsetHeight;

                if (image.width <= canvasWidth && image.height <= canvasHeight) {
                    canvas.width = image.width;
                    canvas.height = image.height;
                } else if (image.width / canvasWidth > image.height / canvasHeight) {
                    canvas.width = canvasWidth * .95;
                    canvas.height = image.height / image.width * canvasWidth * .95;
                } else {
                    canvas.width = image.width / image.height * canvasHeight * .95;
                    canvas.height = canvasHeight * .95;
                }

                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                initialPixels = imageData.data;
            }
        }
    }
});

document.getElementById("brightness").addEventListener("change", function () {

    ChangePicture(Number(document.getElementById("brightness").value),
        Number(document.getElementById("contrast").value),
        parseFloat(document.getElementById("transparent").value));

});

document.getElementById("contrast").addEventListener("change", function () {

    ChangePicture(Number(document.getElementById("brightness").value),
        Number(document.getElementById("contrast").value),
        parseFloat(document.getElementById("transparent").value));

});

document.getElementById("transparent").addEventListener("change", function () {

    ChangePicture(Number(document.getElementById("brightness").value),
        Number(document.getElementById("contrast").value),
        parseFloat(document.getElementById("transparent").value));

});

let Truncate = function (number) {
    
    if (number < 0) {
        return 0;
    } else if (number > 255) {
        return 255;
    } else {
        return Math.trunc(number);
    }
    
}

const ChangePicture = function (newBrightness, newContrast, newTransparency) {

    let pixels = Uint8ClampedArray.from(initialPixels);
    const factor = 259 * (255 + newContrast) / (255 * (259 - newContrast));

    for (let i = 0; i < pixels.length; i = i + 4) {

        pixels[i] = Truncate(factor * (pixels[i] - 128) + 128 + newBrightness);
        pixels[i+1] = Truncate(factor * (pixels[i+1] - 128) + 128  + newBrightness);
        pixels[i+2] = Truncate(factor * (pixels[i+2] - 128) + 128  + newBrightness);
        pixels[i+3] = pixels[i+3] * newTransparency;

    }

    ctx.putImageData(new ImageData(pixels, canvas.width), 0, 0);

}
