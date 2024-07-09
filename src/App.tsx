import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
body {
	font-family: 'Source Sans Pro', sans-serif;
	background-color: #040617;
	color:white;
}
a {
	text-decoration:none;
	color:inherit;
}
* {
  box-sizing: border-box;
}
`;

const Main = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 240px;
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  background-color: #101121;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid #282938;
`;
const Form = styled.form`
  button {
    width: 100%;
  }
`;
const Title = styled.h2`
  font-size: 22px;
  color: #fff;
  margin-bottom: 20px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
`;
const Errors = styled.p`
  color: red;
  padding: 10px;
  + div {
    border: none;
  }
`;
const CountryWrap = styled.div`
  padding: 20px 0;
  border-top: 2px solid #282938;
  button {
    padding: 2px;
    margin: 0;
    border: 0;
    background-color: transparent;
  }
`;
const CountryList = styled.span``;

type FormValues = {
  country: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const [wishCountry, setWishCountry] = useState<string[]>([]);
  const [visitedCounty, setVisitedCounty] = useState<string[]>([]);
  const [loveCounty, setLoveCounty] = useState<string[]>([]);

  useEffect(() => {
    const storedWishCountry = 
      JSON.parse(localStorage.getItem("wishCountry") ?? '[]');
    const storedVisitedCountry = 
      JSON.parse(localStorage.getItem("visitedCountry") ?? '[]');
    const storedLoveCountry = 
      JSON.parse(localStorage.getItem("loveCountry") ?? '[]');
  
    setWishCountry(storedWishCountry);
    setVisitedCounty(storedVisitedCountry);
    setLoveCounty(storedLoveCountry);
  }, []);
  

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.country.trim() === "") {
      return;
    }

    setWishCountry((prev) => {
      const updated = [...prev, data.country];
      localStorage.setItem("wishCountry", JSON.stringify(updated));
      return updated;
    });
    setValue("country", "");
  };

  const handleDelete = (country: string) => {
    setWishCountry((prev) => {
      const updated = prev.filter((c) => c !== country);
      localStorage.setItem("wishCountry", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClick = (country: string) => {
    setWishCountry((prev) => {
      const updated = prev.filter((c) => c !== country);
      localStorage.setItem("wishCountry", JSON.stringify(updated));
      return updated;
    });
    setVisitedCounty((prev) => {
      const updated = [...prev, country];
      localStorage.setItem("visitedCountry", JSON.stringify(updated));
      return updated;
    });
  };

  const handleLoveClick = (country: string) => {
    setVisitedCounty((prev) => {
      const updated = prev.filter((c) => c !== country);
      localStorage.setItem("visitedCountry", JSON.stringify(updated));
      return updated;
    });
    setLoveCounty((prev) => {
      const updated = [...prev, country];
      localStorage.setItem("loveCountry", JSON.stringify(updated));
      return updated;
    });
  };

  const handleLoveDelete = (country: string) => {
    setVisitedCounty((prev) => {
      const updated = prev.filter((c) => c !== country);
      localStorage.setItem("visitedCountry", JSON.stringify(updated));
      return updated;
    });
    setWishCountry((prev) => {
      const updated = [...prev, country];
      localStorage.setItem("wishCountry", JSON.stringify(updated));
      return updated;
    });
  };

  const handleHateClick = (country: string) => {
    setLoveCounty((prev) => {
      const updated = prev.filter((c) => c !== country);
      localStorage.setItem("loveCountry", JSON.stringify(updated));
      return updated;
    });
    setVisitedCounty((prev) => {
      const updated = [...prev, country];
      localStorage.setItem("visitedCountry", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Main>
      <GlobalStyles />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>내가 가고싶은 나라들</Title>
        <input
          type="text"
          {...register("country", {
            required: "😠required!!",
            minLength: {
              value: 1,
              message: "😠required!!",
            },
          })}
        />
        <button type="submit">가자!</button>
      </form>

      <Errors>{errors.country?.message}</Errors>

      <CountryWrap>
        {wishCountry.map((country, index) => (
          <div key={index}>
            <CountryList>- {country}</CountryList>
            <button onClick={() => handleClick(country)}>✅</button>
            <button onClick={() => handleDelete(country)}>❌</button>
          </div>
        ))}
      </CountryWrap>

      <CountryWrap>
        <Title>내가 가본 나라들</Title>
        {visitedCounty.map((country, index) => (
          <div key={index}>
            <CountryList>- {country}</CountryList>
            <button onClick={() => handleLoveClick(country)}>👍</button>
            <button onClick={() => handleLoveDelete(country)}>❌</button>
          </div>
        ))}
      </CountryWrap>

      <CountryWrap>
        <Title>내가 좋아하는 나라들</Title>
        {loveCounty.map((country, index) => (
          <div key={index}>
            <CountryList>- {country}</CountryList>
            <button onClick={() => handleHateClick(country)}>👎</button>
          </div>
        ))}
      </CountryWrap>
    </Main>
  );
}
