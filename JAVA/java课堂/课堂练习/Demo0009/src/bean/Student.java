package bean;

public class Student {

	public Student(String name,int y,int m,int d){
		this.name = name;
		this.date = new Date(y,m,d);
	}
	class Date{
		private int year;
		private int month;
		private int day;
		
		public Date(int year,int month,int day){
			this.year = year;
			this.month = month;
			this.day = day;
		}
		public int getYear() {
			return year;
		}
		public void setYear(int year) {
			this.year = year;
		}
		public int getMonth() {
			return month;
		}
		public void setMonth(int month) {
			this.month = month;
		}
		public int getDay() {
			return day;
		}
		public void setDay(int day) {
			this.day = day;
		}		
		
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	private String name;
	private Date date;
}
