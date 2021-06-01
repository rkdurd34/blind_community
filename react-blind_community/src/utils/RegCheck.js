const check = {

  password(password, level = 3) {
    let regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    switch (level) {
      case 1:
        regExp = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        break;
      case 2:
        regExp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        break;
    }
    return regExp.test(password);
  },
  email(email) {
    let regExp = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@][-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.][A-Za-z]{1,5}$/g;
    return regExp.test(email);
  },
  phone(phone) {
    let regExp = /(^02.{0}|^01.|[0-9]{3})([0-9]+)([0-9]{4})/g;
    return regExp.test(phone);
  }

}
export default check