 # A Redux-based TodoList Demo

## installation

```bash
$npm install
$npm start
```

## Testing

```bash
$npm run test
$npm run test:coverage
```

# 一點小觀念
## pure function & side effect

```javascript

var array = [1, 2, 3, 4, 5];

array.splice(0, 3); // [1, 2, 3]
array.splice(0, 3); // [4, 5]
array.splice(0, 3); // []

```

## interator

```javascript
var it = makeIterator(['yo', 'ya']);
console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true
```

## FP

```javascript
[9, 4].concat([8, 7]) // 合併陣列
      .sort()  // 排序
      .filter(x => x > 5) 
```