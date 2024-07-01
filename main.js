// 6.1
function onlyEvens () {
    for (let i = 10; i < 120; i++) {
        if (i%2 == 0) {
            console.log(i);
        }
    }
}

// 6.2
function arrOdds (array) {
    // for (let i = 0; i < array.length; i++) {
    //     if (array[i] %2 != 0) {
    //         console.log(array[i])
    //     }
    // }
    for (let i of array) {
        if (i %2 != 0) {
            console.log(i);
        }
    }
}
// arrOdds([2, 2, 3, 4, 5]);

// 6.3
function sumOfOdds(start, end) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        if (i % 2 != 0) {
            sum += i;
        }
    }
    return sum;
}

// console.log(sumOfOdds(20, 90));

// 6.4
function isMoreThen(array, target) {
    for (let i of array) {
        if (i > target) {
            console.log(i);
        }
    }
}

// isMoreThen([10, 200, 3, 40, 50], 30);

// 6.5
function everyOfArray(array) {
    for (let i of array) {
        console.log(i);
    }
}
// everyOfArray(['ხვიჩა', 'გოგა', 'მაკა', 'ანა', 'ინა']);

// 6.6
function dateNow() {
    const time = new Date();
    console.log(time.toLocaleString());
}
// dateNow();

// 6.7
function myBirthdayWeekDay (birthday) {
    let days = [
        'კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი',
        'პარასკევი', 'შაბათი',
    ];

    let time = new Date(birthday);
    console.log(days[time.getDay()]);
}

myBirthdayWeekDay("2007-05-30");

