const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

export default {

  getArticles: async function() {
    const currentUser = await this.getUser();
    const url = `${BASE_URL}/api/articles?_expand=user&_sort=id&_order=desc`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.map(article => {
        const user = article.user || {};
        return {
          id: article.id,
          title: article.title, //replace(/(<([^>]+)>)/gi, ""),
          operationType: article.operationType,
          price: article.price, //replace(/(<([^>]+)>)/gi, ""),
          category: article.category,
          date: article.createdAt || article.updatedAt,
          author: user.username || 'Desconocido',
          canBeDeleted: currentUser ? currentUser.userId === article.userId : false,
          allowView: this.isUserLogged() ? article.id : false,
        }
      });
    } else {
      throw new Error(`HTTP Error: ${response.status}`)
    }
  },

  getArticle: async function(article) {
    const url = `${BASE_URL}/api/articles/${article.id}`;
    return window.location.href = url;
  },

  post: async function(url, postData, json=true) {
    return await this.request('POST', url, postData, json);
  },

  delete: async function(url) {
    return await this.request('DELETE', url, {});
  },

  request: async function(method, url, postData, json=true) {
    const config = {
        method: method,
        headers: {},
        body: null
    };
    if (json) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(postData);
    } else {
      config.body = postData;
    }
    const token = await this.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, config);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {            
      throw new Error(data.message || JSON.stringify(data));
    }
  },

  registerUser: async function(user) {
    const url = `${BASE_URL}/auth/register`;
    return await this.post(url, user);
  },

  login: async function(user) {
    const url = `${BASE_URL}/auth/login`;
    return await this.post(url, user);
  },

  saveToken: async function(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: async function() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isUserLogged: async function() {
    const token = await this.getToken();
    return token !== null;  // esto devuelve true o false
  },

  saveArticle: async function(article) {
    const url = `${BASE_URL}/api/articles`;
    return await this.post(url, article);
  },

  getUser: async function() {
    try {
      const token = await this.getToken();
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return null;
      }
      const payload = tokenParts[1];
      const jsonStr = atob(payload);
      const { userId, username } = JSON.parse(jsonStr);
      return { userId, username };
    } catch (error) {
      return null;
    }
  },

  deleteArticle: async function(article) {
    const url = `${BASE_URL}/api/articles/${article.id}`;
    return await this.delete(url);
  },

  logout: async function() {
    return localStorage.removeItem(TOKEN_KEY);
  },
};
