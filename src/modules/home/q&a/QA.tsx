import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon, 
  UserIcon, 
  PaperAirplaneIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

// Định nghĩa kiểu cho câu hỏi
interface Question {
  id: number;
  author: string;
  title: string;
  content: string;
  answers: Answer[];
  tags: string[];
  likes: number;
  dislikes: number;
}

// Định nghĩa kiểu cho câu trả lời
interface Answer {
  id: number;
  author: string;
  content: string;
  likes: number;
  dislikes: number;
}

const TSEQAInterface: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      author: 'Nguyễn Văn A',
      title: 'Làm thế nào để học React hiệu quả?',
      content: 'Mọi người có lời khuyên nào để học React nhanh và hiệu quả không?',
      tags: ['React', 'Học lập trình'],
      likes: 15,
      dislikes: 2,
      answers: [
        {
          id: 1,
          author: 'Trần Văn B',
          content: 'Tôi khuyên bạn nên thực hành project thực tế và học qua các khóa học trực tuyến.',
          likes: 10,
          dislikes: 1
        }
      ]
    }
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [newAnswer, setNewAnswer] = useState('');

  const handleQuestionSubmit = () => {
    if (newQuestion.title && newQuestion.content) {
      const question: Question = {
        id: questions.length + 1,
        author: 'Thành viên hiện tại',
        title: newQuestion.title,
        content: newQuestion.content,
        tags: newQuestion.tags.split(',').map(tag => tag.trim()),
        likes: 0,
        dislikes: 0,
        answers: []
      };

      setQuestions([...questions, question]);
      setNewQuestion({ title: '', content: '', tags: '' });
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedQuestion && newAnswer.trim()) {
      const answer: Answer = {
        id: selectedQuestion.answers.length + 1,
        author: 'Thành viên hiện tại',
        content: newAnswer,
        likes: 0,
        dislikes: 0
      };

      const updatedQuestions = questions.map(q => 
        q.id === selectedQuestion.id 
          ? {...q, answers: [...q.answers, answer]} 
          : q
      );

      setQuestions(updatedQuestions);
      setNewAnswer('');
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center">
          <QuestionMarkCircleIcon className="mr-2 w-8 h-8" /> 
          Diễn Đàn Câu Hỏi CLB Lập Trình TSE
        </h1>
        <div className="flex items-center space-x-2">
          <UserIcon className="w-6 h-6 text-gray-600" />
          <span className="font-medium">Thành Viên</span>
        </div>
      </header>

      {/* Khung tạo câu hỏi mới */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Đặt Câu Hỏi Mới</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Tiêu đề câu hỏi" 
            className="w-full p-2 border rounded"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
          />
          <textarea 
            placeholder="Nội dung chi tiết" 
            className="w-full p-2 border rounded h-24"
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Thẻ (cách nhau bởi dấy phẩy)" 
            className="w-full p-2 border rounded"
            value={newQuestion.tags}
            onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
          />
          <button 
            onClick={handleQuestionSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <PaperAirplaneIcon className="mr-2 w-5 h-5" /> Gửi Câu Hỏi
          </button>
        </div>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="space-y-4">
        {questions.map(question => (
          <div key={question.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{question.title}</h3>
              <div className="flex items-center space-x-2">
                {question.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-2">{question.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Bởi {question.author}</span>
              <div className="flex items-center space-x-2">
                <button className="flex items-center text-green-600">
                  <HandThumbUpIcon className="mr-1 w-5 h-5" /> {question.likes}
                </button>
                <button className="flex items-center text-red-600">
                  <HandThumbDownIcon className="mr-1 w-5 h-5" /> {question.dislikes}
                </button>
                <button 
                  onClick={() => setSelectedQuestion(question)}
                  className="flex items-center text-blue-600"
                >
                  <ChatBubbleLeftIcon className="mr-1 w-5 h-5" /> 
                  Trả Lời
                </button>
              </div>
            </div>

            {/* Phần trả lời */}
            {question.answers.map(answer => (
              <div key={answer.id} className="bg-gray-100 p-3 mt-2 rounded">
                <p>{answer.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Bởi {answer.author}</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center text-green-600">
                      <HandThumbUpIcon className="mr-1 w-5 h-5" /> {answer.likes}
                    </button>
                    <button className="flex items-center text-red-600">
                      <HandThumbDownIcon className="mr-1 w-5 h-5" /> {answer.dislikes}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal trả lời */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Trả Lời Câu Hỏi</h2>
            <p className="text-gray-600 mb-4">{selectedQuestion.title}</p>
            <textarea 
              placeholder="Nhập câu trả lời của bạn" 
              className="w-full p-2 border rounded h-24 mb-4"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setSelectedQuestion(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button 
                onClick={handleAnswerSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              >
                <PaperAirplaneIcon className="mr-2 w-5 h-5" /> Gửi Câu Trả Lời
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TSEQAInterface;