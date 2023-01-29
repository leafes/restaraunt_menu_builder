const HOST = "http://localhost:8000/api/v1/";

const get = async (path) => {
  try {
    const response = await fetch(`${HOST}${path}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

const post = async (path, requestBody, token = null) => {
  try {
    const response = await fetch(`${HOST}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const signUp = async (user) => await post("auth/sign-up", user);
export const signIn = async (user) => await post("auth/sign-in", user);
export const getMenu = async (id) => await get(`menus/${id}`);

export const createMenu = async (menu) => {
  const createMenuData = await post("menus/", {
    title: menu.title,
    description: menu.description,
  });

  const pathForThisMenu = `menus/${createMenuData.id}/submenus/`;
  menu.submenus.forEach(async (submenu) => {
    const submenuData = await post(pathForThisMenu, {
      title: submenu.title,
      description: submenu.description || 'bobster',
    });
    console.log(submenuData);
    const pathForThisSubMenu = `${pathForThisMenu}${submenuData.id}/dishes/`;
    submenu.dishes.forEach(
      async (dish) =>
        await post(pathForThisSubMenu, {
          title: dish.title,
          price: dish.price,
          description: dish.description,
        })
    );
  });
};
