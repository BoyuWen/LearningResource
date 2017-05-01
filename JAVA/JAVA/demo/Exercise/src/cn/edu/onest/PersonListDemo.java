package cn.edu.onest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PersonListDemo {
	public static void main(String[] args) {
//		Map<Integer, String> map = new HashMap<Integer, String>();
		List<Person> listPerson = new ArrayList<Person>();
		listPerson.add(new Person(50, "Tom"));
		listPerson.add(new Person(34, "LiLy"));
		listPerson.add(new Person(23, "Alise"));
		listPerson.add(new Person(66, "Bob"));
		listPerson.add(new Person(81, "Jim"));
		listPerson.add(new Person(36, "John"));
		listPerson.add(new Person(26, "Mary"));
		
		for (Person person : listPerson) {
			System.out.println(person.toString());
		}
		
		listPerson.sort(null);
		System.out.println(listPerson);
	}
}

class Person implements Comparable<Person>{
	private int age;
	private String name;
	
	public Person(int age, String name) {
		super();
		this.age = age;
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int compareTo(Person person) {
		// TODO Auto-generated method stub
		return this.age - person.age;
	}

	@Override
	public String toString() {
		return "Person [age=" + age + ", name=" + name + "]";
	}
	
	
}
