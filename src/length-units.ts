import * as math from 'mathjs';

math.createUnit('dtp', `${1/72} inch`);
math.createUnit('px', `${72/96} dtp`);

export const UNITS = {
    POINT: 'dtp',
    MILLIMETER: 'mm',
    CENTIMETER: 'cm',
    METER: 'm',
    INCH: 'inch',
    PIXEL: 'px'
};

// inch = 2.54 centimetres exactly (1 centimetre ≈ 0.3937008 inches.)
export const POINT_TO_METER_FACTOR = (1 / 72) * 0.0254;

(<any>window).math = math;
