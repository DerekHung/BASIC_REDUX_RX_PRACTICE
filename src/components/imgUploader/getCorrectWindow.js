const getCorrectWindow = (image, oriX, oriY, moveX, moveY) => {
    moveX = moveX < 0 ? 0 : moveX;
    moveY = moveY < 0 ? 0 : moveY;

    const disX = moveX - oriX;
    const disY = moveY - oriY;

    const res = {
        left: disX > 0 ? oriX : moveX ,
        width: Math.abs(disX),
        top: disY > 0 ? oriY : moveY,
        height: Math.abs(disY)
    }

    if( res.top + res.height > image.height ) res.height = image.height - res.top;
    if( res.left + res.width > image.width ) res.width = image.width - res.left;

    return res;

}

export default getCorrectWindow;