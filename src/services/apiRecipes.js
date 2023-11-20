import axios from "axios";

export async function getAllRecipes(query) {
  
  const res = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
    params: {
      q: query,
      type: "public",
      app_id: "3cb64118",
      app_key: "85576af91f2139b6b0dd6b8f4beff226",
    },
  });

  return res.data
}
