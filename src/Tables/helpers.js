export function rollTable(table) {
  let newTable = [];
  if (table.weights) {
    table.data.forEach((entry, idx) => {
      for (let i = 0; i < table.weights[idx]; i++) {
        newTable.push(entry);
      }
    });
  } else {
    newTable = table;
  }
  const roll = Math.floor(Math.random() * table.data.length);
  return table.data[roll];
}
