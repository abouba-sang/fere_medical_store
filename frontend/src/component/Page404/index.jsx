import { useNavigate } from "react-router-dom"

const Page404 = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <div>Page non trouve</div>
      <button onClick={goBack}>Aller en arriere</button>
    </>
  )
}

export default Page404