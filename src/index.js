const getMenu = async () => {
  const f = await fetch("http://localhost:8000/api/v1/menus/");
  const result = await f.json();
  console.log(result);
  return result;
}

getMenu();

