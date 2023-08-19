import { useState, useEffect } from 'react';
import { useIntersectionObserver } from "@uidotdev/usehooks";
import CountUp from 'react-countup';

const Data = ({ statisticalData, animationDuration }) => {
    //To detect the width of the screen
    const mediaMatch = window.matchMedia('(max-width: 768px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    //To detect when the container appears on the viewport
    const [ref, entry] = useIntersectionObserver({
        threshold: 0,
        root: null,

    });


    //styles
    const styles = {
        container: isSmallScreen => ({
            width: '100%',
            height: '100%',
        }),

        data: isSmallScreen => ({
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center',
        }),

        value: isSmallScreen => ({
            fontSize: isSmallScreen ? '6.5vw' : '2.85vw',
            fontWeight: '800',
            color: 'white',
        }),

        label: isSmallScreen => ({
            fontSize: isSmallScreen ? '4.7vw' : '2.5vw',
        })
    }


    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler)

        return () => mediaMatch.removeListener(handler);
    });

    return (
        <div className='container' ref={ref} style={styles.container(matches)}>
            {
                entry?.isIntersecting && (
                    <div className='data' style={styles.data(matches)}>
                        <div className='value' style={styles.value(matches)}>
                            <CountUp
                                start={0}
                                end={statisticalData.value}
                                suffix=' +'
                                duration={animationDuration}
                            />
                        </div>
                        <div className='label' style={styles.label(matches)}>
                            {statisticalData.label}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Data;