function setCurrentRoom(data)

{
  if (window["angularComponentRef"])

  {

    window['angularComponentRef'].zone.run(() => {
      window['angularComponentRef'].component.setCurrentRoom(data);
    })

  }

}
