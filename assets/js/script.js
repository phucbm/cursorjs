new CustomCursor({
    speed: 0.3,
    hover: [
        {
            selector: 'h1',
            callback: cursor => {
                gsap.to(cursor, {
                    width: '1px',
                    height: '30px',
                    borderRadius: '1px',
                    duration: .2
                });
            }
        }
    ]
});
new CustomCursor({
    speed: 0.5,
    styleEnter: {
        width: '5px',
        height: '5px',
        border: 'none',
        backgroundColor: 'rgba(0,0,0,.5)'
    }
});