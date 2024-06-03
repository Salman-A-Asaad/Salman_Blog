const headersReq = {
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
  },
  credentials: "include",
};
// Auth function
export const signOut = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/signout`,
      {
        method: "POST",
        ...headersReq,
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const signIn = async (formData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/signin`,
      {
        method: "POST",
        ...headersReq,
        body: JSON.stringify(formData),
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const signUp = async (formData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
      {
        method: "POST",
        ...headersReq,
        body: JSON.stringify(formData),
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
// Post function
export const fetchAllPosts = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/post/getPosts`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchFivePost = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/post/getposts?limit=5`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchPostUser = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/post/getposts?userId=${id}`,
      { ...headersReq }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchMorePost = async (id, startIndex) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/post/getposts?userId=${id}&startIndex=${startIndex}`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deletePost = async (postIdToDelete, id) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/post/deletepost/${postIdToDelete}/${id}`,
      { method: "DELETE", ...headersReq }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const createPost = async (formData) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/post/create`,
    {
      method: "POST",
      ...headersReq,
      body: JSON.stringify(formData),
    }
  );
  let data = await res.json();
  if (!res.ok) {
    data = { ...data, isData: false };
  } else {
    data = { ...data, isData: true };
  }
  console.log(data);
  return data;
};
export const fetchPostBySlug = async (postSlug) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/post/getposts?slug=${postSlug}`,
      { ...headersReq }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchPostById = async (postId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/post/getposts?postId=${postId}`,
      { ...headersReq }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updatePost = async (formData, formDataId, currentUserId) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/post/updatepost/${formDataId}/${currentUserId}`,
      {
        method: "PUT",
        ...headersReq,
        body: JSON.stringify(formData),
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// User function
export const fetchUserById = async (user) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${user}`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchFiveUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/getusers?limit=5`,
      { ...headersReq }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchAllUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/getusers`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchMoreUsers = async (startIndex) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/users/getusers?startIndex=${startIndex}`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deleteUser = async (userIdToDelete) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/delete/${userIdToDelete}`,
      {
        method: "DELETE",
        ...headersReq,
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateUser = async (id, formData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/update/${id}`,
      {
        method: "PUT",
        ...headersReq,
        body: JSON.stringify(formData),
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Comment function
export const createComment = async (comment, postId, id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/comment/create`,
      {
        method: "POST",
        ...headersReq,
        body: JSON.stringify({
          content: comment,
          postId,
          userId: id,
        }),
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchAllCommentsPost = async (postId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/comment/getPostComments/${postId}`
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deleteCommemt = async (commentId) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/comment/deleteComment/${commentId}`,
      {
        method: "DELETE",
        ...headersReq,
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchFiveComments = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/comment/getcomments?limit=5`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchAllComments = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/comment/getcomments`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchMoreComments = async (startIndex) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/comment/getcomments?startIndex=${startIndex}`,
      {
        ...headersReq,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const editeCommentById = async (commentId, editedContent) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/comment/editComment/${commentId}`,
      {
        method: "PUT",
        ...headersReq,
        body: JSON.stringify({
          content: editedContent,
        }),
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const likeComment = async (commentId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/comment/likeComment/${commentId}`,
      {
        method: "PUT",
        ...headersReq,
      }
    );
    let data = await res.json();
    if (!res.ok) {
      data = { ...data, isData: false };
    } else {
      data = { ...data, isData: true };
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Search function
export const fetchSearch = async (searchQuery) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/post/getposts?${searchQuery}`,
      { ...headersReq }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
