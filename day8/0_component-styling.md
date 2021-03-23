# 8일차

## 컴포넌트 스타일링
- 일반 CSS : 컴포넌트를 스탕일링하는 가장 기본적인 방식
- Sass : 자주 사용되는 CSS 전처리기(pre-processor) 중 하나로 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해줌
- CSS Module : 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해 주는 옵션
- styled-components : 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해줌

### 일반 CSS
- CSS를 작성할 때 가장 중요한 점은 CSS 클래스를 중복되지 않게 만드는 것
  1. 이름 짓는 규칙
  + 클래스 이름을 컴포넌트이름-클래스 형태로 지어 다른 컴포넌트에서 실수로 중복되는 클래스를 만드는 것을 방지하는 법
  + BEM 네이밍이라고 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식
  2. CSS Selector
  + CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있음

### Sass(Syntactically Awesome Style Sheets)
- 스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해줌
- .sass와 .scss 두 가지 확장자를 지원함
  + .sass 확장자는 중괄호({})와 세미콜론(;)을 사용하지 않음
  + .scss 확장자는 기존 CSS를 작성하는 방식과 문법이 크게 다르지 않음
- `node-sass` : Sass를 CSS로 변환해주는 라이브러리   \
  `npm install node-sass`
> /styling-react/src/SassComponent.scss, SassComponent.js

### CSS Module
- CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉 **[파일이름]\_[클래스이름]\_[해시값]** 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술
- .module.css 확장자로 파일을 저장하기만 하면 CSS Module이 적용
  + Sass를 사용할 때도 .module.scss 확장자를 사용해주면 CSS Module로 사용할 수 있음
> /styling-react/src/CSSModule.module.css, CSSModule.js

### styled-components
- `CSS-in-JS` 라이브러리 중에서 가장 선호하는 라이브러리   \
\* `CSS-in-JS` : 자바스크립트 파일 안에 스타일을 선언하는 방식
- 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에 .css 또는 .scss 확장자르 가진 스타일 파일을 따로 만들지 않아도 된다는 큰 이점
- Tagged 템플릿 리터럴
  + 스타일을 작성할 때 ` 을 사용하여 만든 문자열에 스타일 정보를 넣어서 사용하는 문법
  + 템플릿 안에 넣은 값을 온전히 추출할 수 있음
- 스타일링된 엘리먼트 만들기
  + 컴포넌트 파일 상단에서 styled를 불러오고 , `styled.태그명`을 사용하여 구현
- 스타일에서 props 조회하기
  + `background: ${(props) => props.color || "blue"};`
> /styling-react/src/StyledComponent.js


\* 참고
- `classnames` : CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리(`npm install classnames`)
```jsx
const MyComponent = ({highlighted, theme}) => {
  <div className={classNames('MyComponent', {highlighted}, theme)}>Hello</div>
}
```
- highlighted 값이 true이면 highlighted 클래스가 적용되고, false면 적용 x
- theme으로 전달받는 문자열은 내용 그대로 클래스에 적용