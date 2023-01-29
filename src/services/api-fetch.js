const HOST = "http://localhost:8000";

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

export const signUp = async (user) => await post("/api/v1/auth/sign-up", user);
export const signIn = async (user) => await post("/api/v1/auth/sign-in", user);
export const getMenu = async (id) => await get(`/api/v1/menus/${id}`);

export const createMenu = async (menu) => {
  const createMenuData = await post("menus/", {
    title: menu.title,
    description: menu.description,
  });
  const pathForThisMenu = `menus/${createMenuData.id}/submenus/`;

  menu.submenus.forEach(async (submenu) => {
    const submenuData = await post(pathForThisMenu, {
      title: submenu.name,
      description: submenu.description,
    });
    const pathForThisSubMenu = `${pathForThisMenu}${submenuData.id}/dishes/`;

    submenu.meals.forEach(
      async (meal) =>
        await post(pathForThisSubMenu, {
          title: meal.name,
          price: meal.price,
          description: meal.description,
        })
    );
  });
};
