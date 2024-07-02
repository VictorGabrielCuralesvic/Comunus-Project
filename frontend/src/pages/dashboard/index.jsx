import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import Header from '../../components/Header';
import "tailwindcss/tailwind.css";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/foruns");
      setPosts(response.data.foruns); // Ajuste para pegar o array 'foruns' do response.data
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const createPost = async () => {
    try {
      const postData = {
        title,
        content,
        authorId: 1  // authorId está sendo definido como estático (1) conforme solicitado
      };

      const response = await axios.post("http://localhost:5000/foruns", postData);
      console.log("Post created successfully:", response.data);
      fetchPosts();
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F9FAFB]">
      <Header />

      <div className="w-full p-4 flex justify-end items-center">
        <input
          type="text"
          placeholder="Search"
          className="border w-1/2 md:w-1/3 border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={openModal}
          className="bg-primary hover:primaryDark text-white font-bold py-2 px-4 rounded"
        >
          + Adicionar Post
        </button>
      </div>

      <div className="max-w-screen-xl w-full mt-16 md:mt-0">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt} // Passando a data createdAt como prop
            />
          ))
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Criar Novo Post
                    </h3>
                    {/* Campos do formulário para criar um novo post */}
                    <div className="mt-5">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Título do Post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Conteúdo
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        rows="3"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Conteúdo do Post"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={createPost}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Criar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
