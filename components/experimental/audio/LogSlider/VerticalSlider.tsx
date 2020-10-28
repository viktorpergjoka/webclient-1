import {Direction, getTrackBackground, Range} from "react-range";
import React from "react";
import {styled, useStyletron} from "styletron-react";
import {RGBColor} from "./index";

const Wrapper = styled("div", {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    boxSizing: "border-box"
});

const VerticalSlider = (props: {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => any;
    onFinalChange?: (value: number) => any;
    color: RGBColor;
    width: number;
    text?: string;
    showMarks?: boolean;
}) => {
    const [css] = useStyletron();

    const solidColor = `rgba(${props.color[0]},${props.color[1]},${props.color[2]},0.6)`;
    return (
        <Wrapper>
            <Range
                direction={Direction.Up}
                step={props.step}
                min={props.min}
                max={props.max}
                values={[props.value]}
                onChange={values => props.onChange(values[0])}
                onFinalChange={values => {
                    if (props.onFinalChange)
                        props.onFinalChange(values[0]);
                }}
                renderMark={({props: markProps, index}) => (
                    <div
                        {...markProps}
                        className={css({
                            ...markProps.style,
                            height: index % 2 ? '1px' : '2px',
                            width: index % 2 ? (props.width / 2) + "px" : props.width + "px",
                            backgroundColor: index * props.step > props.max - props.value ? solidColor : 'rgba(255,255,255,0.2)'
                        })}
                    />
                )}
                renderTrack={({props: trackProps, children}) => (
                    <div
                        onMouseDown={trackProps.onMouseDown}
                        onTouchStart={trackProps.onTouchStart}
                        className={css({
                            ...trackProps.style,
                            flexGrow: 1,
                            display: 'flex',
                            height: '100%'
                        })}
                    >
                        <div
                            ref={trackProps.ref}
                            className={css({
                                width: props.width + "px",
                                height: '100%',
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: solidColor,
                                background: getTrackBackground({
                                    values: [props.value],
                                    colors: ["rgba(255,255,255,0.2)", "transparent"],
                                    min: props.min,
                                    max: props.max,
                                    direction: Direction.Up
                                }),
                                ":hover": {
                                    background: getTrackBackground({
                                        values: [props.value],
                                        colors: [`rgba(${props.color[0]},${props.color[1]},${props.color[2]},0.6)`, "transparent"],
                                        min: props.min,
                                        max: props.max,
                                        direction: Direction.Up
                                    })
                                },
                                alignSelf: 'center'
                            })}
                        >
                            {children}
                        </div>
                    </div>
                )}

                renderThumb={({props: thumbProps, isDragged}) => {
                    return (
                        <div
                            {...thumbProps}
                            className={css({
                                ...thumbProps.style,
                                height: props.width + "px",
                                width: props.width + "px",
                                borderRadius: '4px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                outlineColor: solidColor,
                                boxShadow: '0px 1px 6px #AAA'
                            })}
                        >
                            {props.text && (
                                <div
                                    className={css({
                                        position: 'absolute',
                                        top: "0px",
                                        left: (props.width + 4) + "px",
                                        color: '#000',
                                        fontWeight: 'bold',
                                        padding: '4px',
                                        borderRadius: '4px',
                                        backgroundColor: solidColor,
                                        whiteSpace: 'nowrap'
                                    })}
                                >
                                    {props.text}
                                </div>
                            )}
                            <div
                                className={css({
                                    width: '16px',
                                    height: '4px',
                                    backgroundColor: isDragged ? solidColor : '#CCC'
                                })}
                            />
                        </div>
                    )
                }}
            />
        </Wrapper>
    );
}
export default VerticalSlider;