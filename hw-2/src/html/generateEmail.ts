export const generateEmail = (companyName: string, title: string, verificationCode: number) => {
  return `<div style="height: 100vh; background-color: #ffff00">
  <header style="width: 100%; background-color: #4b4a4a; padding: 20px; text-align: center; margin-bottom: 100px">
    <h2 style="color: #ff0; font-size: 22px; padding: 0; margin: 0">Welcome to ${companyName}</h2>
  </header>
  <main>
    <div style="height: 100%; text-align: center">
      <h1
        style="
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #4b4a4a;
          padding: 0;
          margin: 0;
          margin-bottom: 15px;
        "
      >
        ${title}
      </h1>
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #4b4a4a;
          padding: 0;
          margin: 0;
          margin-bottom: 8px;
        "
      >
        Hello
      </p>
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #4b4a4a;
          padding: 0;
          margin: 0;
          margin-bottom: 8px;
        "
      >
        Please confirm your email
      </p>
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #4b4a4a;
          padding: 0;
          margin: 0;
          margin-bottom: 8px;
        "
      >
        Your code:
      </p>
      <p
        style="
          width: 100px;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #ff0;
          padding: 0;
          margin: 0;
          margin-bottom: 25px;
          padding: 8px;
          text-align: center;
          background-color: #4b4a4a;
          border-radius: 8px;
          margin: 0 auto 25px auto;
        "
      >
        ${verificationCode}
      </p>
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #4b4a4a;
          padding: 0;
          margin: 0;
          margin-bottom: 0;
        "
      >
        If it's not you, just ignore this letter.
      </p>
    </div>
  </main>
</div>
`
}
