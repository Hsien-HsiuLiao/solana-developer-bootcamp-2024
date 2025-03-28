#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod nextjstailwindanchor {
    use super::*;

  pub fn close(_ctx: Context<CloseNextjstailwindanchor>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.nextjstailwindanchor.count = ctx.accounts.nextjstailwindanchor.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.nextjstailwindanchor.count = ctx.accounts.nextjstailwindanchor.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeNextjstailwindanchor>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.nextjstailwindanchor.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeNextjstailwindanchor<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Nextjstailwindanchor::INIT_SPACE,
  payer = payer
  )]
  pub nextjstailwindanchor: Account<'info, Nextjstailwindanchor>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseNextjstailwindanchor<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub nextjstailwindanchor: Account<'info, Nextjstailwindanchor>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub nextjstailwindanchor: Account<'info, Nextjstailwindanchor>,
}

#[account]
#[derive(InitSpace)]
pub struct Nextjstailwindanchor {
  count: u8,
}
