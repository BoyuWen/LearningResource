package cn.edu.onest;
public class EnumDemo {

	private String name;
	private Sex sex;
	private ColorPrevate favarate;

	public ColorPrevate getFavarate() {
		return favarate;
	}

	public void setFavarate(ColorPrevate favarate) {
		favarate.setColor("Black");
		favarate.setId(3);
		this.favarate = favarate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		System.out.println(sex.set());
		this.sex = sex;
	}

	@Override
	public String toString() {
		return "EnumDemo [name=" + name + ", sex=" + sex + ", favarate ="
				+ favarate + "]";
	}

	public void display() {
		System.out.println(toString());
	}

	public static void main(String[] args) {

		EnumDemo ed = new EnumDemo();
		ed.setName("Tom");
		ed.setSex(Sex.FMAIL);
		ed.setFavarate(ColorPrevate.BLUE);
		// System.out.println(ColorPrevate.BLUE.getColor() + "£º"
		// +ColorPrevate.BLUE.getId());
		ColorPrevate.BLUE.displayEnum();
		ed.display();

		// MyClass my = new MyClass();
		// my.print();
	}

}

enum Sex {
	MAIL, FMAIL;

	Sex() {

	}

	String set() {
		return "Sex·½·¨";

	}
}

enum ColorPrevate {
	RED("red", 0), BLUE("blue", 1);

	private ColorPrevate(String color, int id) {
		this.color = color;
		this.id = id;
	}

	String color;
	int id;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void displayEnum() {
		System.out.println(this.getId() + ": " + getColor());
		System.out.println(this.toString());
	}

}

interface MyInterface {
	int N = 10;

	void print();
}

class MyClass implements MyInterface {

	int num;

	public MyClass() {
		this.num = N;
	}

	@Override
	public void print() {
		// TODO Auto-generated method stub
		System.out.println("MyClass --> " + num);
	}

}

class Mine {
	int age;

	void setAge(int age) {
		this.age = age;
	}
}

enum NUM implements MyInterface {
	No1(2), No2(3);

	NUM(int n) {
		this.num = n;
	}

	private int num;

	public int getNum() {
		return num;
	}

	@Override
	public void print() {
		// TODO Auto-generated method stub
		System.out.println(this.getNum() + " : " + this.toString());
	}

}