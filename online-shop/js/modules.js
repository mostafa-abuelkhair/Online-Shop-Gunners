class getAndRender {

    url;
    data;
  
    constructor(u,r){
      this.url=u;
    }
  
    async get() {
  
      try {
          const response = await fetch(this.url);
    
          const result = await response.json();
  
          this.data= result.data;
  
          this.render(this.data);
  
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    render(d){
  
    }
  
  }


  class productStorage {

    productSet = new Set();
    key;
  
    constructor(k){
      this.key=k;
      this.getCounter();
    }


    store(){
      let arr = [...this.productSet];
      localStorage.setItem(this.key, JSON.stringify(arr));
      console.log(JSON.stringify(arr));

    }

    add(p){
      this.productSet.add(p);
      this.store();
      this.getCounter();
    }
  
    getCounter(){
      let arr = JSON.parse(localStorage.getItem(this.key));
      if(arr){arr=[]}
      this.productSet=new Set(arr);
      document.getElementById(this.key+"-counter").innerHTML= arr.length;
    }

    remove(id){
      this.productSet.delete(id);
      this.store();
      this.getCounter();
    }
    
  }

  export {getAndRender,productStorage};