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
      if (this.productSet.has(p)){
        this.remove(p)
      } else {
        this.productSet.add(p);
        this.store();
        this.getCounter();
        
      };
      

    }
  
    getCounter(){
      let arr =[];
      try {
        if ( !(localStorage.getItem(this.key) === null) ) {
          arr = JSON.parse(localStorage.getItem(this.key));
          this.productSet=new Set(arr);
        }
      }
      catch{
        console.log("empty cart");
      }
      document.getElementById(this.key+"-counter").innerHTML= arr.length;
    }

    remove(id){
      this.productSet.delete(id);
      this.store();
      this.getCounter();
    }
    
  }

  export {getAndRender,productStorage};