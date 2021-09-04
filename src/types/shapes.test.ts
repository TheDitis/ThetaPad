import {PointUtils, PolyUtils} from "./shapes";

test('should create a point {x: 130, y: 130}', () => {
    expect(PointUtils.new(130, 130)).toMatchObject({x: 130, y: 130})
})


//// TESTS FOR PolyUtils:

// Test for PolyUtils.calcLengths
test('should return [10, 20, 30, 40]', () => {
    const points = [
        {x: 0, y: 0},
        {x: 10, y: 0},
        {x: 10, y: 20},
        {x: 40, y: 20},
        {x: 40, y: 60}
    ];
    expect(PolyUtils.calcLengths(points)).toMatchObject([10, 20, 30, 40])
})

// Test for PolyUtils.calcAngles
test('should return [0, 90, 45]', () => {
    const points = [
        PointUtils.new(0, 0),
        PointUtils.new(0, 100),
        PointUtils.new(100, 100),
        PointUtils.new(50, 50)
    ];
    expect(PolyUtils.calcLineAngles(points)).toMatchObject([0, 90, 45]);
})