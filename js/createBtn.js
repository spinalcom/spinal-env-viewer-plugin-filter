export default function createButton(buttonName, buttonIcon, buttonAction) {

  let button = new window.Autodesk.Viewing.UI.Button(buttonName);

  button.onClick = () => {
    typeof buttonAction === "function" ? buttonAction() : console.log("");
  }

  var icon = button.container.firstChild;
  icon.className =
    "adsk-button-icon md-icon md-icon-font md-theme-default";

  icon.innerHTML = buttonIcon;

  return button;

}