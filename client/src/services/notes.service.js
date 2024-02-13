import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

//const baseUrl = 'http://localhost:3000/api/notes';
const baseUrl = 'https://notepad-b.onrender.com/api/notes';


const useCreateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  
  const createNote = async (title) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/create-note', { token: cookies.accessToken, title });
      setIsLoading(false);
      return { code: 200, message: data.message, nid: data.nid };
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
      return { code: error?.response.status, message: error?.response.data.message };
    }
  };

  return { createNote, isLoading };
};

const useUpdateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  
  const updateNote = async (nid, newContent) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/update-note', { token: cookies.accessToken, nid, newContent });
      setIsLoading(false);
      return { code: 200, message: data.message };
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
      return { code: error?.response.status, message: error?.response.data.message };
    }
  };

  return { updateNote, isLoading };
};

const useReadNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  
  const readNote = async (nid) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/read-note', { token: cookies.accessToken, nid });
      setIsLoading(false);
      return { code: 200, note: data.note };
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
      return { code: error?.response.status, message: error?.response.data.message };
    }
  };

  return { readNote, isLoading };
};

const useReadAllNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [cookies] = useCookies(['accessToken']);
  
  const readAllNotes = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/read-all-notes', { token: cookies.accessToken });
      setIsLoading(false);
      setNotes(data.notes)
      return { code: 200 };
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
      return { code: error?.response.status, message: error?.response.data.message };
    }
  };

  return { readAllNotes, isLoading, notes };
};

const useDeleteNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  
  const deleteNote = async (nid) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/delete-note', { token: cookies.accessToken, nid });
      setIsLoading(false);
      return { code: 200, message: data.message };
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
      return { code: error?.response.status, message: error?.response.data.message };
    }
  };

  return { deleteNote, isLoading };
};

export { useCreateNote, useUpdateNote, useReadNote, useReadAllNotes, useDeleteNote };
