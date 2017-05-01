package bean;

public class Student {
	
	//学生类的属性	
	private String name;
	private String id;
	private int age;
	
	//构造方法
		public Student(String name,String id,int age){
			this.name = name;
			this.id = id;
			this.age = age;
		}
		
		public Student(){
			this.name = "admin";
			this.id = "12345";
			this.age = age;
		
		}
	
	//定义方法
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName(){
		return this.name;
	}
	public void setName(String name){
		this.name = name;
	}	
	
	public void study(){
		System.out.println("good good study,day day up!");
	}	
	public void study(String name){
		System.out.println(name+"good good study,day day up!");
	}
}
