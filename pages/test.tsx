function MyPage() {
  return (
    <div>
      <object
        className="w-full h-screen"
        type="application/pdf"
        data="http://localhost:3000/test.pdf"
      >
        <p>not suppoerted</p>
      </object>
    </div>
  )
}

export default MyPage
