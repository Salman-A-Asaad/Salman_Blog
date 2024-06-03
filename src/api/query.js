import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createComment,
  createPost,
  deletePost,
  deleteUser,
  fetchAllPosts,
  fetchPostUser,
  fetchUserById,
  fetchAllUsers,
  fetchAllComments,
  fetchAllCommentsPost,
  fetchFiveComments,
  fetchFivePost,
  fetchFiveUsers,
  fetchPostById,
  fetchPostBySlug,
  deleteCommemt,
  likeComment,
  editeCommentById,
  fetchSearch,
  fetchMoreComments,
  fetchMorePost,
  fetchMoreUsers,
  signIn,
  signOut,
  signUp,
  updatePost,
  updateUser,
} from "./apiFunctions";
// Auth
export const useSignOut = () => {
  return useMutation({
    mutationFn: () => {
      return signOut();
    },
  });
};
export const useSignIn = () => {
  return useMutation({
    mutationFn: ({ formData }) => {
      return signIn(formData);
    },
  });
};
export const useSignUp = () => {
  return useMutation({
    mutationFn: ({ formData }) => {
      return signUp(formData);
    },
  });
};
// Post
export const getAllPosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchAllPosts });
};
export const getAllCommentsPosts = (postId) => {
  return useQuery({
    queryKey: ["allCommentsPost", postId],
    queryFn: () => {
      return fetchAllCommentsPost(postId);
    },
  });
};
export const getFivePosts = (isAdmin) => {
  return useQuery({
    queryKey: ["fivePosts"],
    queryFn: fetchFivePost,
    enabled: isAdmin,
  });
};
export const getMorePosts = (id, startIndex) => {
  return useQuery({
    queryKey: ["morePostsUser", startIndex],
    queryFn: () => {
      return fetchMorePost(id, startIndex);
    },
    enabled: false,
  });
};
export const getPostsUser = (isAdmin, id) => {
  return useQuery({
    queryKey: ["postsUser"],
    queryFn: () => {
      return fetchPostUser(id);
    },
    enabled: isAdmin,
  });
};
export const useDeletePost = () => {
  return useMutation({
    mutationFn: ({ postIdToDelete, id }) => {
      return deletePost(postIdToDelete, id);
    },
  });
};
export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({ formData }) => {
      return createPost(formData);
    },
  });
};
export const getPostBySlug = (postSlug) => {
  return useQuery({
    queryKey: ["post", postSlug],
    queryFn: () => {
      return fetchPostBySlug(postSlug);
    },
  });
};
export const getPostById = (postId) => {
  return useQuery({
    queryKey: ["postId", postId],
    queryFn: () => {
      return fetchPostById(postId);
    },
  });
};
export const useUpdatePost = () => {
  return useMutation({
    mutationFn: ({ formData, formDataId, currentUserId }) => {
      return updatePost(formData, formDataId, currentUserId);
    },
  });
};
// User
export const getUser = (user) => {
  return useQuery({
    queryKey: ["user", user],
    queryFn: () => {
      return fetchUserById(user);
    },
    enabled: !!user,
  });
};
export const getFiveUsers = (isAdmin) => {
  return useQuery({
    queryKey: ["fiveUsers"],
    queryFn: fetchFiveUsers,
    enabled: isAdmin,
  });
};
export const getMoreUsers = (startIndex) => {
  return useQuery({
    queryKey: ["moreUsers", startIndex],
    queryFn: () => {
      return fetchMoreUsers(startIndex);
    },
    enabled: false,
  });
};
export const getAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetchAllUsers();
    },
  });
};
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: ({ userIdToDelete }) => {
      return deleteUser(userIdToDelete);
    },
  });
};
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, formData }) => {
      return updateUser(id, formData);
    },
  });
};
// Comment
export const useSaveChangeComment = () => {
  return useMutation({
    mutationFn: ({ commentId, editedContent }) => {
      return editeCommentById(commentId, editedContent);
    },
  });
};
export const useCreateComment = () => {
  return useMutation({
    mutationFn: ({ comment, postId, id }) => {
      return createComment(comment, postId, id);
    },
  });
};
export const useLikeComment = () => {
  return useMutation({
    mutationFn: ({ commentId }) => {
      return likeComment(commentId);
    },
  });
};
export const useDeleteComment = () => {
  return useMutation({
    mutationFn: ({ commentIdToDelete }) => {
      return deleteCommemt(commentIdToDelete);
    },
  });
};
export const getFiveComments = (isAdmin) => {
  return useQuery({
    queryKey: ["fiveComments"],
    queryFn: fetchFiveComments,
    enabled: isAdmin,
  });
};
export const getAllComments = (isAdmin) => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: fetchAllComments,
    enabled: isAdmin,
  });
};
export const getMoreComments = (startIndex) => {
  return useQuery({
    queryKey: ["comments", startIndex],
    queryFn: () => {
      return fetchMoreComments(startIndex);
    },
    enabled: false,
  });
};
// Search
export const useSearch = () => {
  return useMutation({
    mutationFn: ({ searchQuery }) => {
      return fetchSearch(searchQuery);
    },
  });
};
