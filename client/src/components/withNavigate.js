import { useNavigate, useParams } from 'react-router-dom';

export const withNavigate = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    
    return (
      <Component
        navigate={navigate}
        params={params}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

export default withNavigate;