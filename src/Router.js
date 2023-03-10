import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Videos from './routes/Videos';
import VideoDetail from './routes/VideoDetail';
import NotFound from './NotFound';

const router = createBrowserRouter([
  {
    path: '/moontube',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/moontube',
        element: <Videos />,
      },
      {
        path: '/moontube/videos',
        element: <Videos />,
      },
      {
        path: '/moontube/videos/:keyword',
        element: <Videos />,
      },
      {
        path: '/moontube/videoDetail/:videoId',
        element: <VideoDetail />,
      },
    ],
  },
]);

export default router;
