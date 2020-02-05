var sm = sm || {};
sm.imageProcessing = sm.imageProcessing || {};
sm.imageProcessing.InIt_FileReader = function(){
    const $imageInput = document.getElementById('imageInput');
    const $selectedImagePreview = document.getElementById('selectedImagePreview');
    const selectedImagePreview_ctx = $selectedImagePreview.getContext('2d');
    const fileReader = new FileReader();
    const image_obj = new Image();
    var image_obj_bitmap;

    function applyFilter(){
        // console.log(image_obj);
        const i_w = image_obj.width;
        const i_h = image_obj.height;
        const imageData = selectedImagePreview_ctx.getImageData(0, 0, i_w, i_h);
        console.log(imageData);

        for( let x = 0; x < i_w; x++ ){
            for( let y = 0; y < i_h; y++ ){
                let pixel_index = ( x + ( y * i_w )) * 4;
                imageData.data[ pixel_index + 2 ] *= 1.2;
                imageData.data[ pixel_index ] -= 24;
            }
        }

        selectedImagePreview_ctx.putImageData( imageData , 0, 0);
    }

    function drawImageOnCanvas(e){
        $selectedImagePreview.width = image_obj.width;
        $selectedImagePreview.height = image_obj.height;
        selectedImagePreview_ctx.drawImage( image_obj , 0 , 0);

        applyFilter();
    }

    image_obj.addEventListener('load',(e) => {
        console.log('SHUB',e, image_obj);
        document.body.appendChild( image_obj );
        drawImageOnCanvas(e);
    });

    function load_base64_Image(e){
        const base64_img = e.target.result;
        image_obj.src = base64_img;
    }

    fileReader.addEventListener('load',(e) => {
        // console.log(e.target.result);
        load_base64_Image(e);
    });

    // function applyFilter_bitmap(){
    //     const i_w = image_obj_bitmap.width;
    //     const i_h = image_obj_bitmap.height;
    //     const imageData = selectedImagePreview_ctx.getImageData(0, 0, i_w, i_h);
    //     console.log(imageData);

    //     for( let x = 0; x < i_w; x++ ){
    //         for( let y = 0; y < i_h; y++ ){
    //             let pixel_index = ( x + ( y * i_w )) * 4;
    //             imageData.data[ pixel_index + 2 ] *= 1.2;
    //             imageData.data[ pixel_index ] -= 24;
    //         }
    //     }

    //     selectedImagePreview_ctx.putImageData( imageData , 0, 0);
    // }

    // function drawBitmapImageOnCanvas(){
    //     $selectedImagePreview.width = image_obj_bitmap.width;
    //     $selectedImagePreview.height = image_obj_bitmap.height;
    //     selectedImagePreview_ctx.drawImage( image_obj_bitmap , 0 , 0);

    //     applyFilter_bitmap();
    // }

    function loadFilereader(e){
        const img_file = e.target.files[0];
        fileReader.readAsDataURL( img_file );
        // createImageBitmap( img_file )
        //     .then( ( bitmap ) => {
        //         console.log(bitmap);
        //         image_obj_bitmap = bitmap;

        //         drawBitmapImageOnCanvas();
        //     });
    }

    $imageInput.addEventListener('change', (e) => {
        // console.log(e.target.files);
        loadFilereader(e);
    });
};

(function(){
    window.onload = function(){
        sm.imageProcessing.InIt_FileReader();
    }
    return 0;
})();