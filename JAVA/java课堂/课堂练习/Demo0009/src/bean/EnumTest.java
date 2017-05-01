package bean;

public class EnumTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		WeekDay wd = WeekDay.Mon;
		printWeekDay(wd);
	}

	public static void printWeekDay(WeekDay day) {
		switch (day) {
		case Mon:
			System.out.println("星期一");
			break;
		case Fri:
			System.out.println("星期五");
			break;
		default:
			System.out.println("错误");
			break;

		}

	}

}
