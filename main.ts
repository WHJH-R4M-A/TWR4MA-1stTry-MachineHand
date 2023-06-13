function stop () {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    0
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    0
    )
}
let on = 0
let item = 0
let angle = 90
pins.servoWritePin(AnalogPin.P1, angle)
stop()
basic.forever(function () {
    if (item == 0) {
        if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            if (on == 0) {
                on += 1
                sensors.DDMmotor(
                AnalogPin.P13,
                0,
                AnalogPin.P14,
                60
                )
            } else {
                on = 0
                stop()
            }
        }
        if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            if (on == 0) {
                on += 1
                sensors.DDMmotor(
                AnalogPin.P13,
                0,
                AnalogPin.P14,
                60
                )
            } else {
                on = 0
                stop()
            }
            basic.pause(300)
        }
    } else if (item == 1) {
        if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            sensors.DDMmotor(
            AnalogPin.P15,
            0,
            AnalogPin.P16,
            80
            )
        } else if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            sensors.DDMmotor(
            AnalogPin.P15,
            0,
            AnalogPin.P16,
            80
            )
        } else {
            stop()
        }
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        angle += 10
        pins.servoWritePin(AnalogPin.P1, angle)
        basic.pause(50)
    }
    if (input.buttonIsPressed(Button.B)) {
        angle += -10
        pins.servoWritePin(AnalogPin.P1, angle)
        basic.pause(50)
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        stop()
        if (item < 1) {
            item += 1
            basic.showLeds(`
                # # . . .
                . # . . .
                . # # # .
                . # . # .
                . # . # .
                `)
        } else {
            item = 0
            basic.showLeds(`
                # # # # #
                # . . . #
                # . . . #
                # . . . #
                # # # # #
                `)
        }
    }
})
