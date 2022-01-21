new CustomCursor({
    speed: 0.15,
    hover: [
        {
            selector: 'h1',
            in: cursor => {
                gsap.to(cursor, {
                    borderRadius: 0,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    scaleX: .05,
                    scaleY: .8,
                    duration: .2
                });
            },
            out: cursor => {
                gsap.to(cursor, {
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0)',
                    scaleX: 1,
                    scaleY: 1,
                    duration: .2
                });
            }
        }
    ]
});
new CustomCursor({
    speed: 0.5,
    style: {
        width: '5px',
        height: '5px',
        border: 'none',
        backgroundColor: 'rgba(0,0,0,.5)'
    }
});