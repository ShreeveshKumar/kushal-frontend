const personalDetails = {
    name: 'John Doe',
    phone: '123-456-7890',
    address: '123 Main Street, Cityville',
};

const slottimes = [
    {
        id: 1,
        time: "4-5 pm",
        optionValue: "1"
    },
    {
        id: 2,
        time: "5-6 pm",
        optionValue: "2"
    },
    {
        id: 3,
        time: "6-7 pm",
        optionValue: "3"
    }
]


const occurrence = [
    {
        id: 1,
        option: "One time"
    },
    {
        id: 2,
        option: "Regular"
    },
]


module.exports = { personalDetails, slottimes, occurrence }