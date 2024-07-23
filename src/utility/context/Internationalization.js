import React from "react";
import { IntlProvider } from "react-intl";
import messages_en from "../../assets/data/locales/en.json";
import messages_hi from "../../assets/data/locales/hi.json";
import messages_de from "../../assets/data/locales/de.json";
import messages_fr from "../../assets/data/locales/fr.json";
import messages_pt from "../../assets/data/locales/pt.json";

const menu_messages = {
  en: messages_en,
  hi: messages_hi,
  de: messages_de,
  fr: messages_fr,
  pt: messages_pt
};

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(props) {
    super(props);

    // Initialize locale from localStorage or default to 'en'
    const storedLocale = localStorage.getItem("locale") || "en";

    this.state = {
      locale: storedLocale,
      messages: menu_messages[storedLocale]
    };
  }

  switchLanguage = language => {
    // Update state with the selected language and messages
    this.setState({
      locale: language,
      messages: menu_messages[language]
    });

    // Store selected language in localStorage
    localStorage.setItem("locale", language);
  };

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;

    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: this.switchLanguage
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };


// Following is old code and above is new code in future for reference follow following

// import React from "react"
// import { IntlProvider } from "react-intl"

// import messages_en from "../../assets/data/locales/en.json"
// import messages_hi from "../../assets/data/locales/hi.json"
// import messages_de from "../../assets/data/locales/de.json"
// import messages_fr from "../../assets/data/locales/fr.json"
// import messages_pt from "../../assets/data/locales/pt.json"


// const menu_messages = {
//   en: messages_en,
//   hi: messages_hi,
//   de: messages_de,
//   fr: messages_fr,
//   pt: messages_pt
// }

// const Context = React.createContext()

// class IntlProviderWrapper extends React.Component {
//   state = {
//     locale: "en",
//     messages: menu_messages["en"]
//   }

//   render() {
//     const { children } = this.props
//     const { locale, messages } = this.state
//     return (
//       <Context.Provider
//         value={{
//           state: this.state,
//           switchLanguage: language => {
//             // Update state with the selected language and messages
//             this.setState({
//               locale: language,
//               messages: menu_messages[language]
//             });
          
//             // Store selected language in localStorage
//             localStorage.setItem("locale", language);
//           }
//           // switchLanguage: language => {
//           //   this.setState({
//           //     locale: language,
//           //     messages: menu_messages[language]
//           //   })
//           // }
//         }}
//       >
//         <IntlProvider
//           key={locale}
//           locale={locale}
//           messages={messages}
//           defaultLocale="en"
//         >
//           {children}
//         </IntlProvider>
//       </Context.Provider>
//     )
//   }
// }

// export { IntlProviderWrapper, Context as IntlContext }
