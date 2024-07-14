import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from '../../components/Header';

const ForumDetail = ({ forumId }) => {
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (forumId) {
      fetchForumDetails();
      fetchComments();
    }
  }, [forumId]);

  const fetchForumDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/foruns`);
      const forumData = response.data.foruns.find(f => f.id === Number(forumId));
      if (forumData) {
        setForum(forumData);
      } else {
        console.error(`Fórum com ID ${forumId} não encontrado.`);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do fórum:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${forumId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const token = Cookies.get('token'); // Obtém o token de autenticação dos cookies
      console.log('Token:', token); // Adiciona o token ao cabeçalho da requisição

      const response = await axios.post(`http://localhost:5000/comments/${forumId}`, {
        content: commentContent
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Adiciona o token ao cabeçalho da requisição
        }
      });
      
      // Atualizar a lista de comentários após o envio bem-sucedido
      fetchComments();

      // Limpar o campo de comentário e fechar o modal
      setCommentContent('');
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  if (!forum) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header />
      <div className="max-w-3xl mx-auto py-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{forum.title}</h1>
          <p className="text-gray-600 mb-2">Por: {forum.author.name}</p>
          <p className="text-gray-400 text-sm mb-4">Criado em: {new Date(forum.createdAt).toLocaleDateString()}</p>
          
          <p className="mb-4">{forum.content}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Comentários</h2>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="bg-gray-200 rounded-lg p-4 mb-4">
                <p className="text-gray-800 mb-2">{comment.content}</p>
                <p className="text-gray-600 mb-2">Por: {comment.author.name}</p>
                <p className="text-gray-400 text-sm">Criado em: {new Date(comment.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>Nenhum comentário encontrado.</p>
          )}

          {/* Botão para abrir o modal */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={() => setShowModal(true)}
          >
            Adicionar Comentário
          </button>

          {/* Modal para enviar comentário */}
          {showModal && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Adicionar Comentário</h2>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Digite seu comentário..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Enviar Comentário
                  </button>
                </form>
                <button
                  className="absolute top-0 right-0 p-2"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const forumId = params.id;

  return {
    props: {
      forumId
    }
  };
}

export default ForumDetail;
