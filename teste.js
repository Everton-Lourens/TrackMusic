function reverseArray(oldArray) {
    const reversedArray = oldArray.reverse().map((item, index) => {
        return { ...item, id: index + 1 };
    });
    return reversedArray;
}

const teste = [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }, { id: 3, name: 'test3' }];

console.log(reverseArray(teste)); // Saída: [{ id: 1, name: 'test3' }, { id: 2, name: 'test2' }, { id: 3, name: 'test1' }]










/*
function reverseArray(oldArray) {
    oldArray.map((item, index, array) => {
        const newId = array.length - index;
        return { ...item, id: newId };
    });
    const newArrayReversed = oldArray.reverse();
    return newArrayReversed;
}

const teste = [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }, { id: 3, name: 'test3' }]

console.log(reverseArray(teste)) // Saída: [{ id: 3, name: 'test3' }, { id: 2, name: 'test2' }, { id: 1, name: 'test1' }]
console.log(reverseArray(teste)) // O que eu desejo: [{ id: 1, name: 'test3' }, { id: 2, name: 'test2' }, { id: 3, name: 'test1' }]
*/