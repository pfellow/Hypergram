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

                let canvas = document.getElementById('canvas');
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

                let ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            }
        }
    }
});
