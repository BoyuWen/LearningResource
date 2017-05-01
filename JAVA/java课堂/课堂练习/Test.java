package bean;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Student mary = new Student("mary", "123", 23);
		// mary.setName("mary");
		System.out.println("name: " + mary.getName() + " id" + mary.getId());
		// mary.study("marymary");

		// Student lily = new Student();
		// lily.setName("lily");
		// System.out.println("name:"+lily.getName());

		Student admin = new Student();
		System.out.println("name:" + admin.getName());

	}

}
