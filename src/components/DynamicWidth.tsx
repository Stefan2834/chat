import React, { ReactNode, useState, useEffect } from 'react';

interface DynamicWidthComponentProps {
    navbar: boolean;
    children: ReactNode;
}

const DynamicWidthComponent: React.FC<DynamicWidthComponentProps> = ({ navbar, children }) => {
    const [phone, setPhone] = useState(true);
    let padding;

    if (navbar) {
        padding = '320px';
    } else {
        padding = '110px';
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setPhone(true);
            } else {
                setPhone(false);
            }
        };
        
        // Check if running in the browser before adding the event listener
        if (typeof window !== 'undefined') {
            if(window.innerWidth < 1000) {
                setPhone(true)
            } else {
                setPhone(false)
            }
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <>
            {!phone ? (
                <div
                    style={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'hidden',
                        paddingBottom: 0,
                        paddingLeft: padding,
                        transition: 'padding 400ms ease',
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    style={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'hidden',
                        paddingLeft: 0,
                        paddingBottom: 56,
                        transition: 'padding 400ms ease',
                    }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default DynamicWidthComponent;
