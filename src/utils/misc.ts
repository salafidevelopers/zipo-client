export const randomCh = (length) => {
  let id = "";

  for (var i = 0; i < length; i++) {
    id += "ab1cd2efg3hij4klmn5opqr6stu7vw8xy9z".split("")[
      Math.floor(Math.random() * 34)
    ];
  }

  return id;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

export const handleLinkCopy = (toast, link) => {
  navigator.clipboard.writeText(link);
  if (!toast.isActive(link)) {
    toast({
      id: Math.random(),
      title: "Link copied",
      description: link,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
};
