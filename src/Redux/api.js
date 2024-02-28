const apiLinks = "https://crystalsolutions.com.pk/arshadbz/";


export const fetchDataItem = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_item.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };


export const fetchDataCategory = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_category.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };



  export const fetchDataOrderList = async () => {
    try {
      const response = await fetch(`${apiLinks}/OrderList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };