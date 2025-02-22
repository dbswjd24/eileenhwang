import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH, WINDOW_HEIGHT = 1200, 600
GROUND_HEIGHT = 50
FPS = 60
START_DELAY = 3  # Reduced countdown to 3 seconds

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Create the game window
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Endless Runner Game")

# Set up the game clock
clock = pygame.time.Clock()

# Game variables
dino_img = pygame.image.load("dino.png")
cactus_img = pygame.image.load("cactus.png")
bird_img = pygame.image.load("bird.png")

dino_width, dino_height = 60, 60  # Adjusted dinosaur size
cactus_width, cactus_height = 50, 50
bird_width, bird_height = 50, 30

dino_x = 50
dino_y = WINDOW_HEIGHT - GROUND_HEIGHT - dino_height
dino_speed = 2  # Slower dinosaur speed
gravity = 1
jump = -20  # Adjusted jump height
jumping = False

obstacle_list = []
score = 0
game_speed = 1  # Slower game speed
speed_increase_interval = 1500  # Increase speed every 1500 milliseconds (slower initial increase)

min_obstacle_distance = 200  # Minimum distance between obstacles

leaderboard_file = "leaderboard.txt"

font = pygame.font.SysFont(None, 30)

def draw_ground():
    pygame.draw.rect(screen, WHITE, (0, WINDOW_HEIGHT - GROUND_HEIGHT, WINDOW_WIDTH, GROUND_HEIGHT))

def draw_dino(x, y):
    dino_img_scaled = pygame.transform.scale(dino_img, (dino_width, dino_height))
    screen.blit(dino_img_scaled, (x, y))

def draw_cactus(x, y):
    cactus_img_scaled = pygame.transform.scale(cactus_img, (cactus_width, cactus_height))
    screen.blit(cactus_img_scaled, (x, y))

def draw_bird(x, y):
    bird_img_scaled = pygame.transform.scale(bird_img, (bird_width, bird_height))
    screen.blit(bird_img_scaled, (x, y))

def draw_score():
    score_text = font.render(f"Score: {score}", True, BLACK)
    screen.blit(score_text, (10, 10))

def draw_start_message(start_time):
    elapsed_time = pygame.time.get_ticks() - start_time
    remaining_time = max(0, START_DELAY - elapsed_time // 1000)
    if remaining_time > 0:
        message = font.render(f"Get ready! Starting in {remaining_time} seconds", True, BLACK)
        screen.blit(message, (WINDOW_WIDTH // 2 - 200, WINDOW_HEIGHT // 2 - 30))

def increase_speed():
    global game_speed
    game_speed += 0.5  # Adjusted speed increase

def check_collision(dino_x, dino_y, dino_width, dino_height, obstacle_x, obstacle_y, obstacle_width, obstacle_height):
    # Adjusted collision conditions to make the hitbox smaller
    return (
        dino_x + dino_width * 0.4 < obstacle_x + obstacle_width * 0.8
        and dino_x + dino_width * 0.8 > obstacle_x + obstacle_width * 0.2
        and dino_y + dino_height * 0.2 < obstacle_y + obstacle_height * 0.8
        and dino_y + dino_height * 0.8 > obstacle_y + obstacle_height * 0.2
    )

def generate_obstacle():
    obstacle_type = random.choices(["cactus", "bird"], weights=[0.7, 0.3])[0]
    obstacle_x = WINDOW_WIDTH
    if obstacle_list and obstacle_x - obstacle_list[-1]["x"] < min_obstacle_distance:
        return  # Ensure minimum distance between obstacles

    if obstacle_type == "cactus":
        obstacle_y = WINDOW_HEIGHT - GROUND_HEIGHT - cactus_height
        # Randomize cactus placement
        obstacle_x += random.randint(0, min_obstacle_distance)
        obstacle_list.append({"x": obstacle_x, "y": obstacle_y, "type": "cactus"})
    elif obstacle_type == "bird":
        obstacle_list.append({"x": obstacle_x, "y": random.randint(dino_y - bird_height, dino_y), "type": "bird"})

def update_leaderboard(new_score):
    leaderboard = []
    try:
        with open(leaderboard_file, "r") as file:
            leaderboard = [int(line.strip()) for line in file]
    except FileNotFoundError:
        pass

    leaderboard.append(new_score)
    leaderboard.sort(reverse=True)

    with open(leaderboard_file, "w") as file:
        for entry in leaderboard[:5]:  # Keep only the top 5 scores
            file.write(f"{entry}\n")

    return leaderboard

def draw_leaderboard(leaderboard):
    font = pygame.font.SysFont(None, 30)
    text = font.render("Leaderboard", True, BLACK)
    screen.blit(text, (50, 50))

    for i, score in enumerate(leaderboard[:5]):
        text = font.render(f"{i + 1}. {score}", True, BLACK)
        screen.blit(text, (50, 90 + i * 30))

def draw_play_again_button():
    font = pygame.font.SysFont(None, 30)
    play_again_rect = pygame.Rect(WINDOW_WIDTH - 250, WINDOW_HEIGHT // 2 + 30, 200, 50)
    pygame.draw.rect(screen, (0, 255, 0), play_again_rect)
    play_again_text = font.render("Play Again", True, BLACK)
    screen.blit(play_again_text, (WINDOW_WIDTH - 230, WINDOW_HEIGHT // 2 + 45))
    return play_again_rect

def draw_game_over():
    font = pygame.font.SysFont(None, 55)
    text = font.render("Game Over", True, BLACK)
    screen.blit(text, (WINDOW_WIDTH // 2 - 150, WINDOW_HEIGHT // 2 - 60))

    draw_score()
    leaderboard = update_leaderboard(score)
    draw_leaderboard(leaderboard)
    play_again_rect = draw_play_again_button()

    pygame.display.flip()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mouse_x, mouse_y = event.pos
                if play_again_rect.collidepoint(mouse_x, mouse_y):
                    reset_game()  # Reset game variables
                    return False  # Return False to indicate not to draw the game over screen
        clock.tick(FPS)

def game_over():
    global score

    while True:
        draw_game_over()

        pygame.display.flip()
        clock.tick(FPS)

        if not draw_game_over():
            return  # Restart the game
        else:
            pygame.quit()
            sys.exit()

def reset_game():
    global obstacle_list, score, game_speed, dino_y, jumping, jump

    obstacle_list = []
    score = 0
    game_speed = 1  # Slower game speed
    dino_y = WINDOW_HEIGHT - GROUND_HEIGHT - dino_height
    jumping = False
    jump = -20

def main():
    global dino_y, jumping, score, game_speed, jump  # Declare jump as global

    pygame.time.set_timer(pygame.USEREVENT + 1, speed_increase_interval)

    start_time = pygame.time.get_ticks()
    playing = False  # Flag to check if the game has started
    game_over_flag = False  # Flag to check if the game is over
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.USEREVENT + 1:
                increase_speed()

        keys = pygame.key.get_pressed()
        if keys[pygame.K_SPACE] or keys[pygame.K_UP] and not jumping:
            jumping = True

        if jumping:
            dino_y += jump
            jump += gravity
            if dino_y >= WINDOW_HEIGHT - GROUND_HEIGHT - dino_height:
                dino_y = WINDOW_HEIGHT - GROUND_HEIGHT - dino_height
                jumping = False
                jump = -20  # Adjusted jump height

        screen.fill(WHITE)
        draw_ground()
        draw_dino(dino_x, dino_y)

        # Display start message and allow the player to control the dinosaur
        draw_start_message(start_time)
        if not playing and pygame.time.get_ticks() - start_time > START_DELAY * 1000:
            playing = True

        # Check if the start delay is over and the player has started playing
        if playing and not game_over_flag:
            # Generate obstacle
            generate_obstacle()

            # Draw and move obstacles
            for obstacle in obstacle_list:
                if obstacle["type"] == "cactus":
                    draw_cactus(obstacle["x"], obstacle["y"])
                elif obstacle["type"] == "bird":
                    draw_bird(obstacle["x"], obstacle["y"])

                obstacle["x"] -= game_speed

                # Check for collision with obstacle
                if check_collision(
                    dino_x, dino_y, dino_width, dino_height, obstacle["x"], obstacle["y"], cactus_width, cactus_height
                ):
                    game_over_flag = draw_game_over()

                # Remove off-screen obstacle
                if obstacle["x"] < -max(cactus_width, bird_width):
                    obstacle_list.remove(obstacle)
                    score += 1

        draw_score()
        pygame.display.flip()
        clock.tick(FPS)

        if game_over_flag:
            game_over()
            game_over_flag = False  # Reset the game over flag after handling the game over screen

if __name__ == "__main__":
    main()
    input("Press Enter to exit...")
